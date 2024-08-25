from pydantic import BaseModel, Field
from typing import List, Union, Optional

class DataRequest(BaseModel):
    data: List[Union[str, int]] = Field(..., example=["M", "1", "334", "4", "B", "Z", "a"])

class DataResponse(BaseModel):
    is_success: bool
    user_id: str
    email: str
    roll_number: str
    numbers: List[str]
    alphabets: List[str]
    highest_lowercase_alphabet: Optional[List[str]]

class OperationCodeResponse(BaseModel):
    operation_code: int = 1
