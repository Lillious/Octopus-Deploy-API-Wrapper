interface IOctopusAPI {
  apiKey: string;
  apiUrl: string;
}

type ApiResponse<T = any> = {
    response: {
        status: number;
        message: string;
        errors: T;
    };
};
