from typing import Any, Dict

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


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
    userpools: Dict[str, Dict[str, Any]] = Field(default_factory=dict)
    check_expiration: bool = True
    jwt_header_prefix: str = "Bearer"
    jwt_header_name: str = "Authorization"

    @model_validator(mode="after")
    def build_userpools(self):
        self.userpools = {
            "eu": {
                "region": self.cognito_region,
                "userpool_id": self.cognito_userpool_id,
                "app_client_id": self.cognito_app_client_id,
            }
        }
        return self

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
