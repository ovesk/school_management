## School Management

A Django-based API designed for managing transaction receipts, recipient information, and organization profiles. This project provides endpoints for creating, updating, and retrieving receipts and organization details, with support for authentication.

---

### Prerequisites

- Python 3.8+
- Django 4.0+
- Django REST Framework
- PostgreSQL or SQLite (for development)

---

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ovesk/school_management.git
   cd school_management
   ```

2. **Set Up a Virtual Environment**:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create Migrations**:
   After installing dependencies, create migration files for the models in the project:
   ```bash
   python manage.py makemigrations
   ```

5. **Apply Migrations**:
   Apply the migrations to your database:
   ```bash
   python manage.py migrate
   ```

6. **Run the Development Server**:
   Start the development server:
   ```bash
   python manage.py runserver
   ```

7. **Create a Superuser**:
   Create a superuser to access the Django admin panel:
   ```bash
   python manage.py createsuperuser
   ```

---

### Development Setup

#### Bypass Authentication for Development
To bypass authentication during development, update the `settings.py` file:
```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
```

#### Static and Media Files
- Add the following to `settings.py`:
  ```python
  STATIC_URL = '/static/'
  MEDIA_URL = '/media/'
  MEDIA_ROOT = BASE_DIR / 'media'
  ```
- Collect static files:
  ```bash
  python manage.py collectstatic
  ```

---

### License

This project is licensed under the [MIT License](LICENSE).
