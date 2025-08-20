pipeline {
    agent any

    environment {
        // Thông tin môi trường CI/CD
        SONAR_TOKEN     = credentials('sonarqube-token')          // Token SonarQube
        DOCKER_REGISTRY = 'ghcr.io/yourusername/webapplication1'  // Registry image
        DOCKER_TAG      = "${env.BUILD_NUMBER}"                   // Tag theo số build
        REMOTE_HOST     = 'user@your.remote.server.ip'            // SSH deploy server
    }

    stages {

        stage('Checkout') {
            steps {
                git credentialsId: 'github-creds', 
                    url: 'https://github.com/bta1710/App1.git', 
                    branch: 'main'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    // Cài sonar scanner (nếu chưa có)
                    sh 'dotnet tool install --global dotnet-sonarscanner || true'
                    sh 'export PATH="$PATH:$HOME/.dotnet/tools"'

                    // Restore + scan + build
                    sh 'dotnet restore WebApplication1.sln'
                    sh 'dotnet-sonarscanner begin /k:"WebApplication1" /d:sonar.login=$SONAR_TOKEN'
                    sh 'dotnet build WebApplication1.sln --no-restore'
                    sh 'dotnet-sonarscanner end /d:sonar.login=$SONAR_TOKEN'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t $DOCKER_REGISTRY:$DOCKER_TAG ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-docker-creds', usernameVariable: 'USERNAME', passwordVariable: 'TOKEN')]) {
                    sh """
                        echo $TOKEN | docker login ghcr.io -u $USERNAME --password-stdin
                        docker push $DOCKER_REGISTRY:$DOCKER_TAG
                    """
                }
            }
        }

        stage('Deploy to Remote VM') {
            steps {
                sshagent(['vm-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no $REMOTE_HOST << 'EOF'
                            docker pull $DOCKER_REGISTRY:$DOCKER_TAG
                            docker stop app || true
                            docker rm app || true
                            docker run -d --name app -p 80:80 $DOCKER_REGISTRY:$DOCKER_TAG
                        EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build và deploy thành công!'
        }
        failure {
            echo '❌ Pipeline thất bại. Kiểm tra lại các bước.'
        }
    }
}
