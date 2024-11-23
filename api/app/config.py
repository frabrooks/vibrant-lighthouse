from pydantic import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    check_expiration = True
    jwt_header_prefix = "Bearer"
    jwt_header_name = "Authorization"
    userpools = {
        "eu": {
            "region": "eu-west-2",
            "userpool_id": "eu-west-2_6I00asBfu",
            "app_client_id": "5emadr5f2c5e6kdsel3pljml5o"
        }
    }

    class Config:
        env_file = '.env'


settings = Settings()
