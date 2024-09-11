
# FinanceKu

FinanceKu is a simple financial management app that allows users to deposit cash, withdraw cash, transfer funds, and view transaction history.
## Features

- User Management
- Deposit
- Withdrawal
- Transfer between account
- Transaction History


## Tech Stack

- Laravel 11
- ReactJS
- TailwindCSS


## Prerequisite


These are the minimum requirements that must be met before installing the application.
- MySQL 8.x
- PHP 8.2
- Composer 2.7.x
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

Create a symlink for static assets
```bash
php artisan storage:link
```

## Environment Variables

To run this project, you may need to adjust the following environment variables to your .env file

`APP_NAME`

`APP_TIMEZONE`

`APP_LOCALE`

`APP_FAKER_LOCALE`

`FILESYSTEM_DISK`

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
    ├── Manager
    │   ├── Dashboard.jsx
    │   └── Teller
    │       ├── Index.jsx
    │       └── ...
    ├── Teller
    │   ├── Dashboard.jsx
    │   └── ...
    └── Customer
        ├── Dashboard.jsx
        └── ...
```