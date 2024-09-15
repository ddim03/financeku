
# FinanceKu

FinanceKu is a simple financial management app that allows users to deposit cash, withdraw cash, transfer funds, and view transaction history.

## Features

- Teller Management
- Customer Management
- Deposit 
- Withdrawal
- Transfer between account
- Transaction History

## Tech Stack

- Laravel 11
- ReactJS
- TailwindCSS
- Breeze


## Prerequisite


These are the minimum requirements that must be met before installing the application.
- MySQL 8.x
- PHP 8.2
- Composer 2.7.6
- NodeJS 20.x.x
- NPM 10.x.x

## Installation

Clone this project using git
```bash
git clone https://github.com/ddim03/financeku.git
```

Go to the project directory
```bash
cd financeku
```

Copy .env.example file and rename to .env
```bash
cp .env.example .env
```

Install dependencies

```bash
composer install
```

```bash
npm install
```

Generate application key
```bash
php artisan key:generate
```

Create a symlink for static file
```bash
php artisan storage:link
```

Migrate database and run the seeder
```bash
php artisan migrate --seed
```

## Environment Variables

To run this project, you may need to adjust the following environment variables to your .env file

`APP_NAME` : your application name

`APP_TIMEZONE` : your local timezone (example: Asia/Jakarta)

`APP_LOCALE` : your local (example: id)

`APP_FAKER_LOCALE` : your local (example: id_ID)

`FILESYSTEM_DISK` : your default file system (example: public)

If you want to use different database you can adjust this configuration

`DB_CONNECTION` : your database type (example: mysql / pgsql)

`DB_HOST` : your database host (example: 127.0.0.1 / localhost)

`DB_PORT` : your database port (example: 3306 / 5432)

`DB_DATABASE` : your database name

`DB_USERNAME` : your database username

`DB_PASSWORD` : your database password

## Run Locally

Start the development server

```bash
npm run dev
```
```bash
php artisan serve
```


## Documentation

[Read this before you start coding](https://github.com/ddim03/workflow-git-and-github)

Please follow this pattern for folder structure 
```
resources / js
├── Components
│   ├── Button.jsx
│   └── ...
├── Hooks
│   ├── useFetch.jsx
│   └── ...
├── Layouts
│   ├── AuthenticatedLayout.jsx
│   └── ...
├── Libs
│   ├── axios.js
│   └── ...
├── Utils
│   ├── currencyFormat.js
│   └── ...
└── Pages
    ├── Teller
    │   ├── Partials
    │   │   ├── FormModal.jsx
    │   │   └── ...
    │   ├── Index.jsx
    │   └── ...
    └── Customer
        ├── Index.jsx
        └── ...
```