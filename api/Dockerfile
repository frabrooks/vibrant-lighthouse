FROM python:3.10.0

WORKDIR /usr/src/app

ENV PYTHONPATH=/usr/src/app

COPY api/requirements.txt ./requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY api ./api
COPY database ./database

CMD ["uvicorn", "api.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
