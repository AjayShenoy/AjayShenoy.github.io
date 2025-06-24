# Setup

## Google Colab

### Access Google Colab
````{tab-set}
```{tab-item} Step 1
Visit <a href="https://colab.research.google.com" target="_blank">Google Colab</a> and login with your email id.
```
```{tab-item} Step 2
Click on `File` and then `New notebook in Drive`
```
```{tab-item} Step 3
In the first code cell of your notebook, type the following command and execute it with CTRL + ENTER
```bash
!pip install groq python-dotenv gradio
```
````

### Setup Groq API key
````{tab-set}
```{tab-item} Step 1
Visit the Groq website
- Go to <a href="https://console.groq.com/signup" target="_blank">Groq's signup page</a>
- If you already have an account, go to <a href="https://console.groq.com/login" target="_blank">Groq's login page</a> instead
```

```{tab-item} Step 2
Create an account
- Fill in your email address
- Create a secure password
- Click on the signup button
- Check your email for a verification link and click it to confirm your account
```

```{tab-item} Step 3
Access the API section
- After logging in, navigate to the Groq Console
- Look for "API Keys" in the left sidebar or navigation menu
- Click on it to go to the API management section
```

```{tab-item} Step 4
Generate a new API key
- Look for a button labeled "Create New API Key" or "Generate API Key"
- You may need to provide a name for your key (e.g., "Colab Project")
- Click the button to generate your key
```
```{tab-item} Step 5
Copy and secure your API key
- Your new API key will be displayed only ONCE
- Copy the key immediately and store it securely
- Consider saving it in a password manager or secure note
- Remember that the key provides access to your Groq account and usage will be billed to you
```
```{tab-item} Step 6
Implement the key in your Colab notebook
- In your Colab notebook, you can set it as an environment variable:
```python
from google.colab import userdata
groq_api_key = userdata.get('GROQ_API_KEY')

```
```{tab-item} YT Tutorial
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    src="https://www.youtube.com/embed/S53BanCP14c" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
</div>
```

````


### Install packages

````{tab-set}
```{tab-item} Linux/MacOS
Run this in a colab code cell
```
````


````{tab-set}
```{tab-item} Linux/MacOS
Get API key
![Description of the image](_static/image.png)
```
```{tab-item} Linux/MacOS
![Description of the image](_static/image.png)
```
````

## Local
If you have a local python development environment set up already, you can do the following.



### Install UV
We will prefer to use UV for python package management.

Detailed setup instructions are here: https://docs.astral.sh/uv/getting-started/installation/

````{tab-set}
```{tab-item} Linux/MacOS
Run this in your terminal
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```
```{tab-item} Windows
Run this in your terminal
```bash
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```
```{tab-item} Explanation (optional)
<!-- [![UV package installer demo]](https://www.youtube.com/watch?v=examplevideolink) -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe src="https://www.youtube.com/embed/examplevideolink" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>
````


### Create and activate virtual environment

````{tab-set}
```{tab-item} Linux/MacOS
Run this in your terminal
```bash
uv venv --python=python3.10
source .venv/bin/activate
```

```{tab-item} Windows
Run this in your terminal
```bash
uv venv --python=python3.10
.venv\Scripts\activate
```
````


### Install packages
In the activated environment, run this script to install relevant python packages.
````{tab-set}
```{tab-item} Packages
Run this in your terminal
```bash
uv pip install groq dotenv gradio
```
````


<!-- ````{tab-set}
```{tab-item} Basic Usage
Install packages
```bash
uv pip install numpy pandas matplotlib
```
```{tab-item} From Requirements File
Install from requirements.txt
```bash
uv pip install -r requirements.txt
```
```{tab-item} With Version Constraints
Install specific versions
```bash
uv pip install torch==2.1.0 transformers>=4.30.0
```
```` -->

### Groq
To access models from the groq inference enginer, we need their API key.
````{tab-set}
```{tab-item} Get API Key
1. Visit [Groq's platform](https://console.groq.com/keys) and create an account if you don't have one
2. Navigate to the API Keys section
3. Click "Create API Key"
4. Copy your API key to a secure location
```
```{tab-item} Create .env file
Create a file whose filename is ".env".
Add you GROQ_API_KEY. Never expose this to anyone.
```python
GROQ_API_KEY="your-api-key-here"
```
```{tab-item} Verify Groq setup
Create a python file, call it verify_groq.py
```python
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq()
response = client.chat.completions.create(
    model="llama3-8b-8192",  # A basic model to test with
    messages=[
        {"role": "user", "content": "Say hello world"}
    ]
)

print(response.choices[0].message.content)

```
```{tab-item} Explanation (optional)
<!-- [![Setting up Groq API key tutorial]](https://www.youtube.com/watch?v=groq-api-setup) -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe src="https://www.youtube.com/embed/groq-api-setup" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>
````
Properly securing your API key is important. Never commit API keys to public repositories

### VS Code setup

If you have a python development setup, you can skip this part. 

````{tab-set}
```{tab-item} Windows
<!-- [![Setting up Groq API key tutorial]](https://www.youtube.com/watch?v=-nh9rCzPJ20) -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe src="https://www.youtube.com/watch?v=-nh9rCzPJ20" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>
```
```{tab-item} Mac
<!-- [![Setting up Groq API key tutorial]](https://www.youtube.com/watch?v=06I63_p-2A4) -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe src="https://www.youtube.com/watch?v=06I63_p-2A4" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>
```
```{tab-item} Linux
<!-- [![Setting up Groq API key tutorial]](https://www.youtube.com/watch?v=NX8SHmkuLn4) -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe src="https://www.youtube.com/watch?v=NX8SHmkuLn4" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>
```
````


### Our directory so far
Our directory structure should look like this now.

````{tab-set}
```{tab-item} Directory
<pre style="background-color: #ffffff; color: #000000; padding: 10px; border-radius: 5px; font-family: monospace;">
📁 genai_course
├── 📄 verify_groq.py
├── ⚙️ .env 
│   └── 🔑 GROQ_API_KEY="your-api-key-here"
</pre>
````
### Build your first chatbot
````{tab-set}
```{tab-item} Code
Put the contents of this code in `app_chatbot.py`
```python
from dotenv import load_dotenv
import gradio as gr
from groq import Groq

load_dotenv()
MODEL = "llama-3.3-70b-versatile"
client = Groq()
system_message = "You are a helpful assistant"

def chat(message, history):
    history = [{"role": msg["role"], "content": msg["content"]} for msg in history]
    messages = (
        [{"role": "system", "content": system_message}]
        + history
        + [{"role": "user", "content": message}]
    )
    stream = client.chat.completions.create(model=MODEL, messages=messages, stream=True)
    response = ""
    for chunk in stream:
        response += chunk.choices[0].delta.content or ""
        yield response

gr.ChatInterface(fn=chat, type="messages").launch()
```
```{tab-item} Explanation
- `load_dotenv()`
  Loads environment variables from the `.env` file into the application.

- `MODEL = "llama-3.3-70b-versatile"`  
  Visit https://console.groq.com/docs/models to know which models exist.

- `client = Groq()`  
  Creates an instance of the `Groq` client to interface with the model service.

- `system_message = "You are a helpful assistant"`  
  Sets a system prompt to instruct the assistant on its role.

- `def chat(message, history):`  
  Defines a function `chat` that takes a new message and the conversation history.

- `history = [{"role": msg["role"], "content": msg["content"]} for msg in history]`  
  Rebuilds the conversation history ensuring each message has a `role` and `content`.

- `messages = ([{"role": "system", "content": system_message}] + history + [{"role": "user", "content": message}])`  
  Combines the system message, conversation history, and new user message into one list.

- `stream = client.chat.completions.create(model=MODEL, messages=messages, stream=True)`  
  Initiates a streaming chat completion request to the model using the assembled messages.

- `response = ""`  
  Initializes an empty string to store the model's response.

- `for chunk in stream:`  
  Iterates over each chunk of the streamed response.

- `response += chunk.choices[0].delta.content or ""`  
  Appends the content from each chunk to the cumulative response, handling cases where the chunk might be empty.

- `yield response`  
  Yields the updated response so it can be streamed to the user in real-time.

- `gr.ChatInterface(fn=chat, type="messages").launch()`  
  Creates and launches a Gradio chat interface using the `chat` function for real-time interaction.

```

````

In your activated environment, run the following command.
````{tab-set}
```{tab-item} Run the script
Run this in your terminal
```python
python app_chatbot.py
```
````

You might see an output like this

```
* Running on local URL:  http://127.0.0.1:7860

To create a public link, set `share=True` in `launch()`.
```

Open your browser and type in the local url. You have your first chatbot up and running. 