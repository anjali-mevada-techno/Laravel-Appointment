<?php

namespace App\Http\Controllers\Admin;

use App\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\MassDestroyClientRequest;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use Gate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Yajra\DataTables\Facades\DataTables;

class ClientsController extends Controller
{
    public function index(Request $request)
    {
        dd('You are active');

        $date = Carbon::now();
        $users = User::where('expiry_date','>=',$date);
        // return response()->json(['success' => true]);

        return view('admin.clients.index');
    }

    public function show(User $user)
    {

        $user->load('roles');
        $date = Carbon::now();
        $user = auth()->user();
        
        $userlist = User::where('expiry_date','>=',$date)->where('status','=','1')->get();
        return view('admin.clients.show', compact('user'));
    }
   
}
