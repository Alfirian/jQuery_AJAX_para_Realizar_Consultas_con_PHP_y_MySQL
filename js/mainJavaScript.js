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
		            data:str + "&accion=addUser&id=" + Math.random(),
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
});