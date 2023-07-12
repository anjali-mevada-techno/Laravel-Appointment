<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use App\Client;
use Auth;
use Carbon\Carbon;
use Redirect;

class expireDateCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check() && Auth::user()){
            $currentDate = Carbon::now();
            $userExpireDate = User::where('expiry_date', '>=' , $currentDate)->first();
            
            if($userExpireDate){
                return Redirect::to('home');
            }
            
            return $next($request);
        }
    }
}