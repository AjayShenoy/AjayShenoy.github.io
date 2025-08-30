# Setup

If you are new to Python development, I would suggest setup on Google Colab. If you are an experienced Python developer, you can set up on Local.
## Google Colab

### Access Colab and install packages
````{tab-set}
```{tab-item} Step 1
Visit <a href="https://colab.research.google.com" target="_blank">Google Colab</a> and login with your email id.
```
```{tab-item} Step 2
Click on `File` and then `New notebook in Drive`

![New Notebook](_static/colab_01.png)
```
```{tab-item} Step 3
In the first code cell of your notebook, type the following command and execute it with CTRL + ENTER (Notice the "!" at the beginning, which is also to be copied)

`!pip install groq python-dotenv gradio`

![Install Packages](_static/colab_02.png)
````

### Setup Groq API key
````{tab-set}
```{tab-item} Step 1
Visit the <a href="https://groq.com/" target="_blank">Groq Website</a>
```

```{tab-item} Step 2
Go to `Developers` and then click on `Free API Key`

![Install Packages](_static/groq_01.png)
```

```{tab-item} Step 3
Login with your email id

![Install Packages](_static/groq_02.png)
```

```{tab-item} Step 4
Click on `Create API Key`
![Install Packages](_static/groq_03.png)
```

```{tab-item} Step 5
Enter a name. For example `GenAICourse`. 
Copy the API key. Never share this with anyone.

![Install Packages](_static/groq_04.png)
```
```{tab-item} Step 6
In your Colab notebook, click on the key symbol, and then on `Add new secret`
![Install Packages](_static/groq_06.png)
```
```{tab-item} Step 7
Add `GROQ_API_KEY` as `NAME` and put the API key that was copied from Groq website as the `VALUE`. Provide Notebook Access

![Install Packages](_static/groq_07.png)
```
```{tab-item} Step 8
To verify the setup, copy this code in a new cell and and execute it.
```python
from groq import Groq
from google.colab import userdata
groq_api_key = userdata.get('GROQ_API_KEY')
client = Groq(api_key=groq_api_key)
response = client.chat.completions.create(
    model="llama3-8b-8192",  # A basic model to test with
    messages=[
        {"role": "user", "content": "Say hello world"}
    ]
)
print(response.choices[0].message.content)

```
````
You should have Groq up and running on your Colab after this.



<!-- ````{tab-set}
```{tab-item} Linux/MacOS
Get API key
![Description of the image](_static/image.png)
```
```{tab-item} Linux/MacOS
![Description of the image](_static/image.png)
```
```` -->
### Build your first chatbot
````{tab-set}
```{tab-item} Code
Put the contents of this code in a new cell and run
```python
import gradio as gr
from groq import Groq

groq_api_key = userdata.get('GROQ_API_KEY')
MODEL = "llama-3.3-70b-versatile"
client = Groq(api_key=groq_api_key)
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
````
You will get a message like this, which has a link that can be opened in a browser. Colab may even embed that chatbot for you. 

```bash
Running Gradio in a Colab notebook requires sharing enabled. Automatically setting `share=True` (you can turn this off by setting `share=False` in `launch()` explicitly).

Colab notebook detected. To show errors in colab notebook, set debug=True in launch()
* Running on public URL: https://a42****.gradio.live

This share link expires in 72 hours. For free permanent hosting and GPU upgrades, run `gradio deploy` from the terminal in the working directory to deploy to Hugging Face Spaces (https://huggingface.co/spaces)
```

![Chatbot](_static/chatbot.png)


## Local
If you have a local python development environment set up already, you can do the following.




### Install packages
In the activated environment, run this script to install relevant python packages.
````{tab-set}
```{tab-item} Packages
Run this in your terminal
```bash
pip install groq dotenv gradio
```
````

### Setup Groq API key
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
````
Properly securing your API key is important. Never commit API keys to public repositories


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