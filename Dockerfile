FROM node:8.16.0-alpine
RUN apk --update --no-cache add git make yarn
ENV CC_TEST_REPORTER_VERSION=latest
ENV CC_TEST_REPORTER_URL https://codeclimate.com/downloads/test-reporter/test-reporter-${CC_TEST_REPORTER_VERSION}-linux-amd64
ENV CC_TEST_REPORTER_NAME cc-test-reporter
RUN wget -O ${CC_TEST_REPORTER_NAME} ${CC_TEST_REPORTER_URL} && chmod +x ${CC_TEST_REPORTER_NAME}
RUN npm install nyc -g
ENTRYPOINT [ "/cc-test-reporter" ]