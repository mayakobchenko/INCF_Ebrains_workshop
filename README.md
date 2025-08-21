# INCF_Ebrains_workshop

Knowledge graph API Swagger: https://core.kg.ebrains.eu/swagger-ui/index.html

jupiter notebooks and python code for programmatic metadata upload

1. create virtual environment

Using python venv:

```
$ python -m venv venv
```

Using Anaconda:

```
$ conda create --name myenv python=3.9
```

2. activate virtual environment

for windows:

```
$ venv\Scripts\activate
$ deactivate
```

macOS/Linux:

```
$ source venv/bin/activate
```

3. install fairgraph package

```
$ pip install fairgraph

```

upgrade and check version:

```
$ pip install -U fairgraph
$ pip show fairgraph
$ python -V
```

If working outside the Collaboratory, you will need to obtain a token (for example from the KG Editor (copy to clipboard), or using clb_oauth.get_token() in a Collaboratory Jupyter notebook) and save it as an environment variable, e.g. at a shell prompt:
```
export KG_AUTH_TOKEN=eyJhbGci...nPq
```
or copy/paste. Tokens obtained from the Lab are valid for longer.

In a Jupyter notebook in the EBRAINS Lab, run the following code:
```
from clb_nb_utils.oauth import get_token
get_token()
```


```
pip install openMINDS
```
pip install pandas openpyxl

