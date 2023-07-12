var userValidator;//Declare Global Variable For User
$(document).ready(function () {
    //Define User Datatable
    var table = $('.data-table').DataTable({
        
        processing: true,
        serverSide: true,
        ajax: {
            url: "users",
          },
          
        columns: [
            {data: 'DT_RowIndex', name: 'DT_RowIndex'},
            {data: 'name', name: 'name'},
            {data: 'email', name: 'email'},
            {data: 'roles', name: 'roles.title'},
            {data: 'action', name: 'action', orderable: false, searchable: false},
        ]
    });
   //User datatable End

    // User Modal Open and validate function also declare
    $('body').on('click', '#add_user', function () {
        $('.loadimg').show();
        $.ajax({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url: 'users/addUser',
            type: 'POST',
            success: function (data) {
                $('#user_modal_content').html(data);
                $('#user_form').validate(userValidator); //Use Global Variable
                $('#UserModal').modal('show');
                $('.loadimg').hide();

            },
            error: function (e) { }
        });
    });
    // End Add User Modal

    // User Variable 
    userValidator = {
        invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('span.error').hide();
            }
        },
        ignore: "",
        rules: {
            'name': { required: true },
            'email': { required: true,email: true},
            'password': { required: true},
            'roles': { required: true},
        },
        messages: {
        },
        submitHandler: function (form) {
            var formData = new FormData(form);
            // Call Ajax for Save Data
            $.ajax({
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                url: $(form).attr('action'),
                method: 'POST',
                dataType: 'JSON',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $('body').find('.spinner-box').show();
                }
            }).done(function (data) {
                $('body').find('.spinner-box').hide();
                if (data.success == true) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: data.message,
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (data.redirect) {
                            window.location.href = data.redirect;
                        } else {
                            $(form)[0].reset();
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: data.message,
                        allowOutsideClick: false,
                    });
                }
            });
            return false;
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            if (element.is("select")) {
                error.insertAfter(element.next('span'));
            } else {
                error.insertAfter(element);
            }
        }

    };

    // Edit User Modal
    $(document).on('click', '.editUser', function () {
        var id = $(this).attr('data-id');
        var check_temp = $(this).attr('check_temp');
        if (check_temp == "edit") {
            $('.loadimg').show();
            $.ajax({
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                url: 'users/editUser',
                method: 'PUT',
                data: { 'id': id },
                success: function (data) {
                    console.log(data);
                    $('#user_modal_content').html(data);
                    $('#user_form').validate(userValidator); //Use Global Variable
                    $('#UserModal').modal('show');
                    $('.loadimg').hide();
                },
                error: function (e) { }
            });
        }
    });
    // End Edit User Modal

    //Delete User Modal
    $('body').on('click', '.deleteUser', function () {
        alert("1");
        var el = $(this);
        var id = $(this).attr('data-id');

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete It!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    type: "POST",
                    dataType: 'JSON',
                    url: "users/" + id,
                    data: { _method: 'delete' },
                    beforeSend: function () {
                        $('body').find('.spinner-box').show();
                    },
                    success: function (data) {
                        if (data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: data.message,
                                allowOutsideClick: false,
                            }).then((result) => {
                                table.row(el.parents('tr')).remove().draw();
                            });
                        }
                    },
                    complete: function (data) {
                        $('body').find('.spinner-box').hide();
                    }
                });
            }
        });
    });
    //End User delete Model
});

