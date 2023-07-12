<?php
use App\Http\Middleware\CheckStatus;

Route::redirect('/', '/login');
Route::redirect('/home', '/admin');
Auth::routes(['register' => false]);

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'namespace' => 'Admin', 'middleware' => ['auth']], function () {
    Route::get('/', 'HomeController@index')->name('home');
    // Permissions
    Route::delete('permissions/destroy', 'PermissionsController@massDestroy')->name('permissions.massDestroy');
    Route::resource('permissions', 'PermissionsController');

    // Roles
    Route::delete('roles/destroy', 'RolesController@massDestroy')->name('roles.massDestroy');
    Route::resource('roles', 'RolesController');

    // Users
    Route::delete('users/destroy', 'UsersController@massDestroy')->name('users.massDestroy');
    Route::get('changeStatus', 'UsersController@changeStatus');
    Route::get('getRoleUserData', 'UsersController@getRoleUserData');
    Route::resource('users', 'UsersController');

    
    // Clients
    Route::delete('clients/destroy', 'ClientsController@massDestroy')->name('clients.massDestroy');
    Route::resource('clients', 'ClientsController')>middleware('admin');

   
});
Route::middleware(['checkStatus'])->group(function(){
 
    Route::resource('clients', 'ClientsController');
    
    });

    // Route::delete('users/destroy', 'mailto:userscontroller@massdestroy')->name('users.massdestroy');
    // Route::post('users/index', 'mailto:userscontroller@index')->name('users.index');
    // Route::post('users/addUser', 'UsersController@addUser');
    // Route::post('users/addUserData', 'UsersController@addUserData');
    // Route::put('users/editUser', 'UsersController@editUser');
    // Route::get('changeStatus', 'UserController@changeStatus');
    // Route::resource('users', 'UsersController');
