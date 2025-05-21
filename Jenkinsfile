#!groovy

@Library('mercadonaonline')
import org.mercadonaonline.SlackNotifications
import org.mercadonaonline.StatusTesters
import org.mercadonaonline.Kubernetes
import org.mercadonaonline.Registry
import org.mercadonaonline.General
import org.mercadonaonline.Mercanetes

def slack = new SlackNotifications(this)
def tester = new StatusTesters(this)
def k8s = new Kubernetes(this)
def registry = new Registry(this)
def general = new General(this)
def metadata = new Mercanetes(this)

node {
    general.checkoutWithTags()
}

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '1'))
    }

    environment {
        IMAGE_NAME = "midona-boilerplate-react-vite-web-nginx"
        DOCKER_IMAGE_NAME = "midona-boilerplate-react-vite-web-nginx"
        BUILD_WORKSPACE = "${env.WORKSPACE.replace(env.JENKINS_JOBS, '/var/jenkins_home/jobs')}"
        DOCKER_CONTEXT_WORKSPACE = "${env.WORKSPACE}"
        DOCKER_BUILD_NETWORK = "$BUILD_ID"+"${env.BRANCH_NAME.replace('/','').replace('_','').replace('-','').toLowerCase()}"+"_${IMAGE_NAME}"
        NODE_IMAGE = "eu.gcr.io/prod-mercadona/node:22.15.0-0.0.1"
        BUILD_COMMAND = "npm run build"
    }

    stages {

        stage ('Preparations') {
            steps {
                script {
                    slack.initializeGitVariables()
                    k8sEnvironment = 'staging'
                    k8sShortNamespace = 'sta'
                    associatedGitTag = general.getAssociatedTag()
                    env.NODE_IMAGE_VERSION = registry.getImageTag()

                    boilerplate_react_vite_ui = null

                    isProduction = env.TAG_NAME != null
                    isStaging = env.BRANCH_NAME == 'master'
                    isPR = env.CHANGE_BRANCH != null

                    if (isProduction) {
                        env.NODE_IMAGE_VERSION = associatedGitTag
                        k8sEnvironment = 'production'
                        k8sShortNamespace = 'prod'
                    }

                    env.GID = sh(returnStdout: true, script: 'id -g $USER').trim()
                    env.UID = sh(returnStdout: true, script: 'id -u $USER').trim()
                    sh 'env'
                }
            }
        }

        stage ('Install dependencies') {
            steps {
                script {
                    sh 'docker login -u _json_key -p "$(cat $HOME/.gcp/gcp.json)" https://eu.gcr.io'
                    sh """
                        docker run --rm -m=4g \
                            -v $JENKINS_JOBS:/var/jenkins_home/jobs \
                            -e CI=true \
                            --workdir $BUILD_WORKSPACE \
                            --name $BUILD_TAG-install \
                                $NODE_IMAGE npm install
                    """
                }
            }
        }

        stage ('Typecheck') {
            when {
                expression {
                    (isPR)
                }
            }
            steps {
                script {
                    sh """
                        docker run --rm -m=4g \
                            -v $JENKINS_JOBS:/var/jenkins_home/jobs \
                            -e NODE_ENV="jenkins" \
                            -e CI=true \
                            --workdir $BUILD_WORKSPACE \
                            --name $DOCKER_BUILD_NETWORK-build $NODE_IMAGE npm run typecheck
                    """
                }
            }
        }

        stage ('Linting') {
            when {
                expression {
                    (isPR)
                }
            }
            steps {
                script {
                    sh """
                        docker run --rm -m=4g \
                            -v $JENKINS_JOBS:/var/jenkins_home/jobs \
                            -e NODE_ENV="jenkins" \
                            -e CI=true \
                            --workdir $BUILD_WORKSPACE \
                            --name $DOCKER_BUILD_NETWORK-build $NODE_IMAGE npm run lint
                    """
                }
            }
        }

        stage ('Tests') {
            when {
                expression {
                    (isPR)
                }
            }
            steps {
                script {
                    sh """
                        docker run --rm -m=4g \
                            -v $JENKINS_JOBS:/var/jenkins_home/jobs \
                            -e NODE_ENV='jenkins' \
                            -e CI=true \
                            -e NODE_IMAGE_VERSION=$NODE_IMAGE_VERSION \
                            --workdir $BUILD_WORKSPACE \
                            --name $BUILD_TAG-build $NODE_IMAGE \
                                npm run test-staging
                    """
                }
            }
            post {
                always {
                    script {
                        // Required for archiving
                        general.restoreFilePermissions(env.BUILD_WORKSPACE, env.UID, env.GID)
                        general.setStatusFromTestResults()
                    }
                }
            }
        }

        stage ('Build') {
            steps {
                script {
                    if(isProduction){
                        BUILD_COMMAND = 'npm run build:prod'
                    }
                    if(isStaging){
                        BUILD_COMMAND = 'npm run build:sta'
                    }
                    sh """
                        docker run --rm -m=4g \
                            -v $JENKINS_JOBS:/var/jenkins_home/jobs \
                            -e NODE_ENV='jenkins' \
                            -e CI=true \
                            -e NODE_IMAGE_VERSION=$NODE_IMAGE_VERSION \
                            --workdir $BUILD_WORKSPACE \
                            --name $BUILD_TAG-build $NODE_IMAGE \
                                $BUILD_COMMAND
                    """
                    if (isProduction) {
                        boilerplate_react_vite_ui = registry.build(env.IMAGE_NAME, ".", associatedGitTag)
                    }
                    if (isStaging || isPR) {
                        boilerplate_react_vite_ui = registry.build(env.IMAGE_NAME)
                    }
                }
            }
        }

        stage ('Publish') {
            when {
                expression {
                    (isStaging || isProduction)
                }
            }
            steps {
                script {
                    if (isProduction) {
                        echo "Tagging production image with tag: " + "${associatedGitTag}"
                        registry.push(boilerplate_react_vite_ui, "${associatedGitTag}")
                    }
                    if (isStaging) {
                        imageTag = registry.getImageTag()
                        registry.push(boilerplate_react_vite_ui, imageTag)
                    }
                }
            }
        }

        stage('Changelog') {
            when {
                expression {
                    (isProduction)
                }
            }
            steps {
                script {
                    checkout(
                        [
                            $class: 'GitSCM',
                            branches: [[name: '*/master']],
                            doGenerateSubmoduleConfigurations: false,
                            extensions: [[$class: 'RelativeTargetDirectory',
                                   relativeTargetDir: 'devtools']],
                            submoduleCfg: [],
                            userRemoteConfigs: [[
                                url: 'https://github.com/mercadona/mercadona.online.devtools.git',
                                credentialsId:'hacendabot-user-token'
                            ]]
                        ]
                    )

                    withEnv(['PROJECT_NAME=boilerplate-react-vite-web']) {
                        changelog = sh(
                            returnStdout: true,
                            script: "./devtools/generate_changelog_by_topic.sh"
                        ).trim()
                    }

                    general.sendReleaseToGithub(associatedGitTag, changelog)
                }
            }
        }

        stage ('Publish release in metadata') {
            when {
                expression {
                    (isStaging || isProduction)
                }
            }
            steps {
                script {
                    appName = "mo-boilerplate-react-vite"
                    k8sEnvironment = "staging"
                    branch = "laboratory"
                    imageTag = registry.getImageTag()

                    if (isProduction) {
                        k8sEnvironment = "production"
                        imageTag = "${associatedGitTag}"
                    }

                    echo "Deploying image with tag: " + "${imageTag} and to the namespace: ${k8sEnvironment}"

                    metadata.setMetadataEndpoint(k8sEnvironment)
                    metadata.release(appName, imageTag, branch)
                }
            }
            post {
                success {
                    script {
                        slack.kubernetesNotifySuccess(k8sEnvironment, imageTag)
                    }
                }
                failure {
                    script {
                        slack.kubernetesNotifyFailure(k8sEnvironment, imageTag)
                    }
                }
            }
        }

        stage ('Docker Registry clean up') {
            when {
                expression {
                    (isStaging)
                }
            }
            steps {
                script {
                    registry.cleanup(env.IMAGE_NAME, 90)
                }
            }
        }
    }

    post {
        always {
            script {
                def removeImage = null
                if (boilerplate_react_vite_ui != null) {
                    removeImage = boilerplate_react_vite_ui.id
                }
                general.restoreFilePermissions(env.BUILD_WORKSPACE, env.UID, env.GID)
                general.cleanEnvironment(removeImage)
            }
            script {
                slack.finalNotify('#set-up-your-vertical-channel', tester.testStatuses())
            }
        }
    }
}
