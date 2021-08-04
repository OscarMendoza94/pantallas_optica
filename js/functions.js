
$( document ).ready(function() {
    setTimeout(
		function(){
            //$(".logo").animate({left: '250px'});
			$('.global').addClass('enfoque');
			setTimeout(
				function(){
					//$('body').removeClass('desenfoque_1');
					$('body').removeClass('enfoque');
					setTimeout(
						function(){
							$('body').removeClass('enfoque');
							$('body').addClass('desenfoque_1');
							setTimeout(
								function(){
									$('body').removeClass('desenfoque_1');
									$('body').addClass('enfoque');
								},
								'300'
							);
						},
						'300'
					);
				},
				'300'
			);

			
		},
		'300'
	);
	
	$('#product_code').focus();
});
//validar el código
	function validate_code(){
		var code = $('#product_code').val();
		var response = '';
		
		if( code == 'QHdA8rjNHwRoyci2' ){
			response = '<i class="fas fa-check-circle icon-b success"></i><br />';
			response += '<p align="center">Código válido!</p>';
	        $('#product_code').val('');

		}else if( code == 'Ds26jymjCYEoD4Vm' || code == 'Ds26jymjCYEoD4Vg' ){//código de óptica
		    if( localStorage.getItem("optica_user") != null ){//muestra el formulario de suma
		        $('#current_points').css('display', 'block');
		        $('#current_points').attr('onclick', 'add_points(this, 1)');
		        return false;
		    }
			response = '<h2>El código requiere de un inicio de sesión para sumar puntos a la óptica</h2>';
			/*$.ajax({
				type : 'post',
				url : 'views/form_login.html',
				success: function ( resp ){*/
					$('.modal-body').load( 'views/form_login.html' );
					$('#exampleModalLabel').html(response);
					$('#exampleModal').modal('show');
					$('#user').focus();
					return true;
			/*	}
			});*/
		}else{//código de usuario final
		    $('#current_points').css('display', 'none');
			response = '<i class="fas fa-exclamation-circle icon-b danger"></i><br />';
			response += '<p align="center">El código es inválido; verifique y vuelva a intentar!</p>';
		    if( code.length != 16 ){
    			response = '<i class="fas fa-exclamation-triangle icon-b warning"></i><br />';
    			response += '<p align="center">El código debe de tener 16 carácteres, verfique y vuelva a intentar</p>';
		    }
		}
		$('#exampleModalLabel').html( 'Resultado' );
		$('.modal-body').html( response );
		$('#exampleModal').modal('show');

	}
	
//validar el inicio de sesión
	function validate_login(){
		if( $('#user').val() != 'admin'
			|| $('#pass').val() != 'admin'){
			$('#login_response').html('Inicio de sesión incorrecto!');
		}else{
			$('#login_response').html('<p style="color: green;">Iniciando Sesión...</p>');
			setTimeout( function () {
				localStorage.setItem("optica_user", "Admin");
				location.href="views/sumar_puntos.html";
/*				$('.form_code').load('views/sumar_puntos.html');
		        $('#exampleModal').modal('hide');*/
				},
				'1000'
			);
		}
	}

//sumar puntos en óptica
    function add_points( obj, optica_id ){
        $(obj).attr( 'onclick', '');
        var points = parseInt( $('.current_points_optica').html().trim() );
        var current_points = parseInt( $('#new_points').html().trim() );
        var new_points = parseInt( current_points + points );
        var response = 'Los puntos fueron sumados exitosamente.'
            + '<br /> Puntos acumulados : ' + new_points;
        $('.current_points_optica').html( new_points );
        $('#current_points').css('display', 'none');
		$('#exampleModalLabel').html( 'Resultado' );
        $('.modal-body').html(response);
		$('#exampleModal').modal('show');
		$('#product_code').val('');
    }

//registro de Óptica
    function register( ){ 
			location.href="views/register.html";
            //$('body').load("views/register.html");
            
    }
//registro de Óptica
    function send(){
        var validations = null;
        if( $( '#password' ).val() !=  $( '#password_confirm' ).val() ){
            validations = '\nLas contraseñas no coinciden!';
        }
        
        if( validations != null ){
            alert(validations);
            $( '#password_confirm' ).select();
            return false;
        }else{
            if( $( '#accept_conditions' ).prop('checked') == false ){
                alert('Tiene que aceptar el Aviso de Privacidad para registrar la Óptica');
                return false;
            }
            
			localStorage.setItem("optica_user", "Admin");
            alert('Óptica registrada exitosamente!');
            
			location.href = 'sumar_puntos.html';
            return false;
        }
            
        }
//cerrar sesion
    function logout(){
		localStorage.removeItem("optica_user");
		location.href = "../index.html";
    }