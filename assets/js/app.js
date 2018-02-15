 $("#msform").submit(function (event) {
                event.preventDefault();
                $("#submit").addClass("disabled");
                var name = $("#name").val();
                var email = $("#email").val();
                var message = $("#message").val();
                var data = "name=" + name + "&email=" + email + "&message=" + message;
                $.ajax({
                    type: "POST",
                    url: "ma.php",
                    data: data,
                    success: function (response) {
                        switch (response) {
                            case "Sent":
                                $("#form-div").html("<div class='alert alert-success' style='padding:10px 30px;'>Your message has been sent, Thank you.</div>");
                                break;
                            case "Failed":
                                alert("Something went wrong, please try again.");
                                $("#submit").removeClass("disabled");
                                break;
                        }
                    }
                });
            });