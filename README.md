![Edubadges](logo.png)
# [edubages-test](#edubages-test)

This repository contains the test suite for the EduBadges platform. Its primary purpose is to validate complete user stories, ensuring that the most important features function as expected.

Please note that this repository includes only the test scripts and the configuration templates required for testing.

## Requirements

To execute the tests the following is required:

* NodeJS installed (version 22.12.x is validated to work)

## Setup

After cloning this repository, follow these steps to retrieve the required packages:

```bash
   npm install
   npx playwright install
```

## Runing test locally

Playwright supports an ui mode. This provides a fancy environment in which you can select a test to be run, check the test execution and retreive locators. This environment is started by:

```bash
   px playwright test --ui
```

If you want to run all the test:

```bash
   npx playwright test
```

The test results are generated in the folder test-results

## Commits

Before committing changes, run the following command to validate your updates:

`npm run precommit`

This command performs the following checks:
* TypeScript Compiler (tsc)
* Linter
* Pretier
* Run all the tests

Ensure all issues are resolved before committing your changes.

## Copyright
Copyright (c) 2025, SURF U.A. Cooperative, Utrecht, The Netherlands
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
