$(function(){
		// creación de ventana con formulario con jquery ui
		$('#agregarUser').dialog({
			autoOpen: false,
			modal:true,
			width:305,
			height:'auto',
			resizable: false,
			close:function(){
				$('#formUsers fieldset > span').removeClass('error').empty();
				$('#formUsers input[type="text"]').val('');
		    	$('#formUsers select > option').removeAttr('selected');
			}
		});

		// funcionalidad del botón que abre el formulario
		$('#goNuevoUser').on('click',function(){
			// Asignamos valor a la variable acción
			$('#accion').val('addUser');

			// Abrimos el Formulario
			$('#agregarUser').dialog('open');
		});

		// Validar Formulario
		$('#formUsers').validate({
		    submitHandler: function(){
		        
		        var str = $('#formUsers').serialize();

		        // alert(str);

		        $.ajax({
		            beforeSend: function(){
		                $('#formUsers .ajaxLoader').show();
		            },
		            cache: false,
		            type: "POST",
		            dataType: "json",
		            url:"includes/phpAjaxUsers.inc.php",
		            data:str + "&id=" + Math.random(),
		            success: function(response){

		            	// Validar mensaje de error
		            	if(response.respuesta == false){
		            		alert(response.mensaje);
		            	}
		            	else{

		            		// si es exitosa la operación
		                	$('#agregarUser').dialog('close');

		                	// alert(response.contenido);
		                	
		                	if($('#sinDatos').length){
		                		$('#sinDatos').remove();
		                	}
		                	
		                	// VErificamos que tipo de acción estamos ejecutando
		                	// Para vaciar la lista de usuarios

		                	if($('#accion').val() == 'editUser'){
		                		$('#listaUsuariosOK').empty();
		                	}

		                	$('#listaUsuariosOK').append(response.contenido);

						}

		            	$('#formUsers .ajaxLoader').hide();

		            },
		            error:function(){
		                alert('ERROR GENERAL DEL SISTEMA, INTENTE MAS TARDE');
		            }
		        });

		        return false;

		    },
		    errorPlacement: function(error, element) {
		        error.appendTo(element.prev("span").append());
		    }
		});


		// Edición de Registros
		$('body').on('click','#listaUsuariosOK a',function (e){
			e.preventDefault();

			// Asignamos valor a la variable acción
			$('#accion').val('editUser');

			// asignamos el id de usurio
			$('#id_user').val($(this).attr('href'));

			// Extraemos valores del registro
			$('#usr_nombre').val($(this).parent().parent().children('td:eq(0)').text());
			$('#usr_puesto').val($(this).parent().parent().children('td:eq(1)').text());
			$('#usr_nick').val($(this).parent().parent().children('td:eq(2)').text());

			// Seleccionando la lista de status
			$('#usr_status option[value='+ $(this).parent().parent().children('td:eq(3)').text() +']').attr("selected",true);

			// Abrimos el Formulario
			$('#agregarUser').dialog('open');

		});
});