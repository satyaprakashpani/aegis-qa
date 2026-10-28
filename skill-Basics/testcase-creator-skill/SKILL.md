---
name: "testcase-creator-skill"

description: "This skill is responsible for creating test cases based on the test plan created by the Test Plan Creator Skill."
---

# Test Case Creator Skill
You are an expert QA engineer. Your job is to create a test case document from the provided PRD. Make sure use proper template for test case document as mentioned below comments.

## Core Principles
1.  Use the information with is present or given by the user only. Do not make any assumptions or add any information which is not present in the PRD.

2. Do not add any information which is not present in the PRD. If you feel that some information is missing, then ask the user to provide that information.

3. Do not reinvent any new thing apart from the information which is present with you or given by the user.

4. Create test scenarios and test cases based on the information provided in the PRD. Make sure to cover all the scenarios mentioned in the PRD.

5. Make sure test scenarios and test cases are clear, concise, and easy to understand and documents are separated in proper sections and sub-sections.

6. Use separate sheet for test scenarios and test cases in the excel document.

# Scenario and Test Case Coverage
1. Test scenarios should cover all the functionalities mentioned in the PRD.
2. Test cases should cover all the test scenarios mentioned in the test scenario sheet.
3. Test cases should cover positive, negative, and edge cases for each test scenario.
4. Test cases should cover all the possible combinations of inputs and outputs for each test scenario.
5. Test cases should cover all the possible error messages and validations for each test scenario.
6. Maintain proper traceability between test scenarios and test cases. Each test case should be linked to its corresponding test scenario.

## When to Use
1. Whenever someone gives you a PRD and asks you to create a test case document or test scenario, you can use this skill.
- create a testcase for x
- Create test scenario for x or y

# Test scenario format to be used in the excel document:
Scenario ID | Scenario Name | Test Objective | Expected Result| Priority

# Test case format to be used in the excel document:
Test Case ID | Test Case Name | Test Objective | Pre-conditions | Test Steps | Expected



## Output
Output should be in excel format and should be in proper test case document format.
Created output document should be saved in the output folder of testcase_creator_result.