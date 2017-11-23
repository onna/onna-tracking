node {
  def project = 'graceful-earth-112011'
  def appName = 'onna-tracking'
  def imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm

  stage 'Build image'
  try {
      sh("docker build -t ${imageTag} .")
  } catch(e) {
      slackSend (
        channel: '#jenkins',
        color: 'red',
        message: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) failed at building with ${e.message}."
      );
      throw e
  }

  stage 'Run JS tests'
  try {

      sh("docker run --name onnatracking.test ${imageTag} npm run test || true")
      sh("docker cp onnatracking.test:/app/coverage .")
      sh("docker cp onnatracking.test:/app/junit .")
      step([$class: 'JUnitResultArchiver', testResults: 'junit/TESTS*.xml'])
  } catch(Exception e){
      slackSend (
        channel: '#jenkins',
        color: 'red',
        message: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) failed at testing with ${e.message}."
      );
      throw e
  } finally {
      sh("docker rm -f onnatracking.test || true")
  }

 stage 'Package to registry'
    try {
        withCredentials([string(credentialsId: 'npm', variable: 'NPM_TOKEN')]) {
          sh("docker run --name onnatracking.test-release -e NPM_TOKEN=${NPM_TOKEN} -e BRANCH=${env.BRANCH_NAME} -e JOB=${env.BUILD_NUMBER} ${imageTag}  npm run publish_npm")
      }
    } catch (e) {
      slackSend (
        channel: '#jenkins',
        color: 'red',
        message: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) failed at packaging with ${e.message}."
      );
      throw e
    } finally {
        sh("docker rm -f onnatracking.test-release || true")
    }

  stage 'Notification'
    try {
      def postHarmony = """
        {
          "component": "onna_tracking",
          "branch": "${env.BRANCH_NAME}",
          "build": "${env.BUILD_NUMBER}",
          "secret": "allplayallwork"
        }
      """
      def response = httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: postHarmony, url: "https://harmony.onna.com/rel0/harmony/@jenkins_library"

    } catch (e) {
      slackSend (
        channel: '#jenkins',
        color: 'warning',
        message: ":boom: Build ${jobBuild} failed to notify harmony with ${e.message}."
      );
    }
      step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'dev@atlasense.com', sendToIndividuals: true])
      slackSend (
        channel: '#jenkins',
        color: 'good',
        message: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) is ready."
      );
}
