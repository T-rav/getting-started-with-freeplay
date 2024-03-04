# Freeplay Integration with OpenAI

These scripts facilitate integration between Freeplay's API and OpenAI's language models, enabling the dynamic generation and processing of prompts. The process includes loading environment variables, initializing clients for both Freeplay and OpenAI, retrieving and formatting prompts based on predefined templates and settings, and sending these prompts to OpenAI's chat model. Responses are recorded, and sessions are logged using Freeplay's API.

## About Freeplay

Freeplay is a pioneering platform designed for the efficient management and optimization of AI model prompts, facilitating seamless creation, testing, and deployment of AI-driven interactions for developers and businesses. Its robust API and intuitive interface make it easier to integrate advanced AI capabilities into various applications, enhancing dynamic content generation, automated support, and personalized experiences.

A distinctive feature of Freeplay is its analytical capabilities, providing users with detailed insights into the performance of their prompts. This includes evaluations of response quality, engagement metrics, and cost-effectiveness, enabling the fine-tuning of prompts for optimal efficiency and effectiveness. Freeplay offers a comprehensive solution for prompt management, ensuring the delivery of superior AI-powered experiences while maintaining scalability and cost control.

## Freeplay Documentation

For more information and getting started with Freeplay, visit the [Freeplay Documentation](https://docs.freeplay.ai/docs/getting-started).

## Getting Started with Python

Navigate to the Python directory of your project:

```bash
cd path/to/python/directory
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the same directory as your script, containing the following environment variables:

```plaintext
FREEPLAY_API_KEY=your_freeplay_api_key_here
FREEPLAY_PROJECT_ID=your_freeplay_project_id_here
OPENAI_API_KEY=your_openai_api_key_here
```

Ensure to replace the placeholder values with your actual API keys and URLs.

### Usage

1. Open `app.py` and update the following variables with your specifics:

```plaintext
freeplay_api_base="freeplay_api_base"
freeplay_project_id="freeplay_project_id"
template_name = "YourTemplateName"
environment = "YourEnvironment"
prompt_variables = {"YourKey": "YourValue"} # Dictionary of input variables for your prompt template.
```

2. Execute the script:

```bash
python app.py
```

Upon running, you will observe graphs in the Freeplay session dashboard, which inform you about the cost and latency associated with running your prompt.

## Getting Started with Node

Navigate to the root directory of your project:

```bash
cd path/to/your/project/directory
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file in the root directory of your project, containing the following environment variables:

```plaintext
FREEPLAY_API_KEY=your_freeplay_api_key_here
FREEPLAY_PROJECT_ID=your_freeplay_project_id_here
OPENAI_API_KEY=your_openai_api_key_here
```

Ensure to replace the placeholder values with your actual API keys.

### Usage

1. Update the script (`app.ts`) with your specifics, including the project ID, template name, environment, and prompt variables.

2. Run the script with:

```bash
npm start
```

Upon running, you will observe graphs in the Freeplay session dashboard, which inform you about the cost and latency associated with running your prompt.