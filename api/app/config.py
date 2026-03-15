from typing import Any, Dict

from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    database_schema: str = "public"
    cognito_region: str
    cognito_userpool_id: str
    cognito_app_client_id: str
    userpools: Dict[str, Dict[str, Any]] = {}
    check_expiration: bool = True
    jwt_header_prefix: str = "Bearer"
    jwt_header_name: str = "Authorization"

    @validator("userpools", pre=False, always=True)
    def build_userpools(cls, value: Dict[str, Dict[str, Any]], values: Dict[str, Any]):
        return {
            "eu": {
                "region": values["cognito_region"],
                "userpool_id": values["cognito_userpool_id"],
                "app_client_id": values["cognito_app_client_id"],
            }
        }

    class Config:
        env_file = '.env'


settings = Settings()
