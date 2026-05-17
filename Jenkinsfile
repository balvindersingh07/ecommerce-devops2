/**
 * Jenkins Declarative Pipeline — CI for e-commerce capstone
 *
 * Prerequisites (manual setup in Jenkins):
 * - Docker pipeline plugin / docker available on agent
 * - Credentials:
 *   - String: ACR_NAME (without .azurecr.io)
 *   - Username/Password: acr-registry-credentials (Docker registry auth for ACR)
 * - Or use Azure CLI + Service Principal credential and run `az acr login`
 *
 * Webhook: GitHub → Jenkins job → configure "GitHub hook trigger for GITScm polling"
 */

pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
  }

  environment {
    IMAGE_TAG = "${env.BUILD_NUMBER}"
    // Override in Jenkins job environment if preferred:
    ACR_NAME = "${env.ACR_NAME ?: 'youracrname'}"
    REGISTRY_HOST = "${ACR_NAME}.azurecr.io"
  }

  triggers {
    // Uncomment if not using SCM webhook:
    // pollSCM('H/5 * * * *')
    // For branch filtering use Multibranch Pipeline instead of this single Jenkinsfile.
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      parallel {
        stage('Frontend') {
          steps {
            dir('frontend') {
              sh 'npm ci'
              sh 'npm run lint'
              sh 'npm run test'
              sh 'npm run build'
            }
          }
          post {
            always {
              junit allowEmptyResults: true, testResults: 'frontend/test-results/junit.xml'
            }
          }
        }

        stage('Backend') {
          steps {
            dir('backend') {
              sh 'npm ci'
              sh 'npm run lint'
              sh 'npm test'
            }
          }
          post {
            always {
              junit allowEmptyResults: true, testResults: 'backend/test-results/junit.xml'
            }
          }
        }
      }
    }

    stage('Archive infra & k8s artifacts') {
      steps {
        archiveArtifacts artifacts: 'k8s/**/*', fingerprint: true, allowEmptyArchive: false
        archiveArtifacts artifacts: 'infra/terraform/**/*', fingerprint: true, allowEmptyArchive: false
      }
    }

    stage('Docker build & push (ACR)') {
      when {
        anyOf {
          branch 'main'
          branch 'develop'
        }
      }
      steps {
        script {
          // Prefer Jenkins credentials bound to Docker registry URL for ACR.
          // Credential type: Username with password (ACR uses admin username or SP with token).
          docker.withRegistry("https://${REGISTRY_HOST}", 'acr-registry-credentials') {
            def imgFront = docker.build("${REGISTRY_HOST}/frontend:${IMAGE_TAG}", '-f frontend/Dockerfile .')
            imgFront.push("${IMAGE_TAG}")
            imgFront.push('latest')

            def imgBack = docker.build("${REGISTRY_HOST}/backend:${IMAGE_TAG}", '-f backend/Dockerfile .')
            imgBack.push("${IMAGE_TAG}")
            imgBack.push('latest')
          }
        }
      }
    }

    stage('Security scan — Trivy') {
      when {
        anyOf {
          branch 'main'
          branch 'develop'
        }
      }
      steps {
        sh '''
          docker pull aquasec/trivy:latest || true
          docker pull ${REGISTRY_HOST}/backend:${IMAGE_TAG} || true
          docker run --rm aquasec/trivy:latest image \
            --exit-code 0 --severity HIGH,CRITICAL ${REGISTRY_HOST}/backend:${IMAGE_TAG} || true
        '''
      }
    }
  }

  post {
    success {
      echo 'CI pipeline succeeded.'
    }
    failure {
      echo 'CI pipeline failed — check logs.'
    }
  }
}
