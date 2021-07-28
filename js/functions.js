//validar el código
	function validate_code(){
		var code = $('#product_code').val();
		var response = '';
		if( code.length > 16 ){
			response = 'El código debe de tener 16 carácteres, verfique y vuelva a intentar';
		}
		
		if( code == 'QHdA8rjNHwRoyci2' ){
			response = 'Código válido!';

		}else if( code == 'Ds26jymjCYEoD4Vm' ){
			response = 'El código requiere de un inicio de sesión para sumar puntos a la óptica';
			$.ajax({
				type : 'post',
				url : 'views/form_login.html',
				success: function ( resp ){
					$('.modal-body').html( resp );
					$('#exampleModalLabel').html(response);
					$('#exampleModal').modal('show');
					return true;
				}
			});


		}else{
			response = 'El código es inválido; verifique y vuelva a intentar!';
		}
		$('#exampleModalLabel').html( 'Resultado' );
		$('.modal-body').html( response );
		$('#exampleModal').modal('show');

	}
//validar el inicio de sesión
	function validate_login(){
		if( $('#user').val() != 'admin'
			&& $('#pass').val() != 'admin'){
			$('#login_response').html('Inicio de sesión incorrecto!');
		}else{
			$('#login_response').html('Iniciando Sessión...');
			setTimeout( function () {
				location.href="views/sumar_puntos.html";
				},
				'1000'
			);
		}
	}

	function alert(){

	}