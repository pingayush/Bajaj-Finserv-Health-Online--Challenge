from fastapi import APIRouter, HTTPException
from src.routes.schemas import DataRequest, DataResponse, OperationCodeResponse

router = APIRouter()

USER_ID = "john_doe_17091999"
EMAIL = "john@xyz.com"
ROLL_NUMBER = "ABCD123"


@router.get("/bfhl", response_model=OperationCodeResponse, status_code=200)
async def get_operation_code():
    return OperationCodeResponse()


@router.post("/bfhl", response_model=DataResponse)
async def process_data(request: DataRequest):
    try:
        numbers = []
        alphabets = []
        highest_lowercase_alphabet = []

        for item in request.data:
            if isinstance(item, str):
                if item.isdigit():
                    numbers.append(item)
                elif item.isalpha():
                    alphabets.append(item)
            elif isinstance(item, int):
                numbers.append(str(item))

        lowercase_alphabets = [char for char in alphabets if char.islower()]
        if lowercase_alphabets:
            highest_lowercase_alphabet = [max(lowercase_alphabets)]

        response = {
            "is_success": True,
            "user_id": USER_ID,
            "email": EMAIL,
            "roll_number": ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highest_lowercase_alphabet
        }

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
