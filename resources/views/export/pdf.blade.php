<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Print Report</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet">
    @vite(['resources/css/app.css'])
</head>

<body class="font-inter antialiased">
    <div class="px-2 py-8 max-w-7xl mx-auto">
        <header>
            <div class="w-full flex justify-center">
                <div class="text-center">
                    <h1 class="text-3xl font-bold mb-1">Financeku</h1>
                    <span>Simple Finance Management Web Application</span>
                </div>
            </div>
        </header>
        <main class="mt-8">
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-200 text-center">
                        <tr>
                            <th scope="col" class="px-2 py-3">
                                no
                            </th>
                            <th scope="col" class="px-2 py-3">
                                date
                            </th>
                            <th scope="col" class="px-2 py-3">
                                account number
                            </th>
                            <th scope="col" class="px-2 py-3">
                                name
                            </th>
                            <th scope="col" class="px-2 py-3">
                                type
                            </th>
                            <th scope="col" class="px-2 py-3">
                                amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($transactions as $transaction)
                        <tr class="bg-white border-b">
                            <td class="px-2 py-4 text-center text-xs">
                                {{ $loop->iteration }}
                            </td>
                            <td class="px-2 py-4 text-center text-xs">
                                {{ $transaction->transaction_date }}
                            </td>
                            <td class="px-2 py-4 text-xs">
                                {{ $transaction->account->account_number }}
                            </td>
                            <td class="px-2 py-4 text-xs">
                                {{ $transaction->account->user->name }}
                            </td>
                            <td class="px-2 py-4 text-xs">
                                {{ Str::upper($transaction->transaction_type) }}
                            </td>
                            @if ($transaction->credit)
                            <td class="px-2 py-4 text-xs">
                                {{ "-Rp" . Number::format($transaction->credit) }}
                            </td>
                            @else
                            <td class="px-2 py-4 text-xs">
                                {{ "+Rp" . Number::format($transaction->debit) }}
                            </td>
                            @endif
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

        </main>
    </div>
    <script>
        window.onload = function () {
            window.print();
            window.onafterprint = function () {
                window.close();
            };
        }
    </script>
</body>

</html>