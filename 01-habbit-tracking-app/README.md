## API Endpoints

### 🔸 POST `/habbit/create`

Creates a new habbit entry.

- **Request Body (JSON):**

  ```json
  {
    "id": 1,
    "name": "reddit",
    "frequency": "daily",
    "status": "PENDING" // optional, defaults to PENDING
  }
  ```

- **Response:**

  - `200 OK` on success
  - `400` or `500` on failure

---

### 🔸 GET `/habbits`

Fetches all habbits stored in the database.

- **Response:**

  ```json
  [
    {
      "id": 1,
      "name": "reddit",
      "frequency": "daily",
      "status": "PENDING"
    },
    ...
  ]
  ```

---

### 🔸 PUT `/habbit/update`

Updates the `status` of an existing habbit.

- **Request Body (JSON):**

  ```json
  {
    "id": 1,
    "status": "COMPLETE"
  }
  ```

- **Response:**

  - `200 OK` on success
  - `404 Not Found` if habbit doesn’t exist
  - `400 Bad Request` if data is missing
