<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Mail\UserMail;
use Mail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;


class AutoUsermail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auto:usermail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $date = Carbon::now();
        $users = User::where('expiry_date', '>=', $date)->where('status','=','1')->get();
        \Log::channel('user')->info('This is User details!',['UserDetails' => $users]);

        return 0;
    }
}


