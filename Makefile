CODECLIMATE_TEST_REPORTER_VERSION = latest
IMAGE_NAME ?= nodeneeds/codeclimate-test-reporter:$(CODECLIMATE_TEST_REPORTER_VERSION)
PROFILE_NAME ?= c.out

Codeclimate:
	docker build --no-cache -t $(IMAGE_NAME) .
.PHONY: dockerBuild

CodeclimateTest:
	docker run --rm -it $(IMAGE_NAME) cc-test-reporter -v
.PHONY: dockerTest

CodeclimateShell:
	docker run --rm -it --env-file=.env -v $(PWD):/opt/app --entrypoint sh --workdir /opt/app $(IMAGE_NAME)
.PHONY: shell
