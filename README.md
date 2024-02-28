# F1Data API Documentation

Welcome to the F1Data API, your go-to source for current and historical Formula 1 data. This API provides access to detailed information about drivers, constructors, and race standings. Our easy-to-use endpoints allow you to integrate F1 data seamlessly into your applications.

## API Endpoints

### Current Data Endpoints

#### Get Current Drivers

- **Endpoint**: `/current/drivers`
- **Method**: `GET`
- **Description**: Fetches a list of current F1 drivers.
- **Response**:
  - `200 OK`: Returns a JSON array of driver objects.
  - `500 Internal Server Error`: Returns an error message if fetching fails.

#### Get Current Constructors

- **Endpoint**: `/current/constructors`
- **Method**: `GET`
- **Description**: Fetches a list of current F1 constructors.
- **Response**:
  - `200 OK`: Returns a JSON array of constructor objects.
  - `500 Internal Server Error`: Returns an error message if fetching fails.

### Historical Data Endpoints

#### Get Historical Constructor Standings by Year

- **Endpoint**: `/historical/constructors/:year`
- **Method**: `GET`
- **Description**: Fetches historical constructor standings for a specified year.
- **Parameters**:
  - `year`: The year for which you want to fetch constructor standings.
- **Response**:
  - `200 OK`:

## Usage Examples

```javascript
// Fetching Current Drivers
fetch("https://api.f1data.dev/drivers")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching current drivers:", error));

// Fetching Historical Constructor Standings for 2020
fetch("https://api.f1data.dev/constructors/2020")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) =>
    console.error(
      "Error fetching historical constructor standings for 2020:",
      error
    )
  );
```

### Error Handling

The F1Data API uses standard HTTP response codes to indicate the success or failure of requests. In the case of errors, a message detailing the issue will be returned. It is important to handle these errors gracefully in your application to ensure a smooth user experience.

### Conclusion

The F1Data API offers a robust set of endpoints for accessing both current and historical Formula 1 data. By integrating our API, you can enhance your applications with rich F1 content. If you encounter any issues or have further questions, please feel free to reach out for support.
