$(document).ready(function(){

    console.log('Ready')

    //  Busque a data atual e atualize-a no DOM
    let data =  new Date()
    let new_data = "Data: "+data.toLocaleDateString('pt-BR', {weekday: "short", year: "2-digit", month: "short", day: "2-digit"})
    $("#date").html(new_data)

    // Escreva um evento, quando o botão Enviar for clicado
    $('#button').click(function(){

        //  Obtenha o valor do texto da área de texto usando o método 'val()'
        let text_value = $('#text').val()

        //  Converta-o em um objeto JS.
        //  Forneça uma "chave" aqui e escreva o mesmo no arquivo app.py também para extrair dados
        let input_text = {'text' : text_value}
        console.log(input_text)

        //  requisição ajax
        $.ajax({

            //  tipo da requisição web
            type : 'POST',

            //url
            url:"/review",
            
            //  dados a serem enviados no formato JSON
            data : JSON.stringify(input_text),

            //  o tipo de resposta esperado é json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  se tudo funcionar, execute esta função
            success : function(result){

                // extraia previsão e a URL do emoticon do resultado
                let sentiment = result.data.sentiment
                let emo_url = result.data.emo_url

                //  atualize os elementos DOM
                $("#sentiment").html(sentiment)
                $("#emoji").attr("src",emo_url)

                //  css
                $("#sentiment").css("display","block")
                $("#emoji").css("display", "block")

            },

            //  se houver algum erro, execute esta função
            error : function(result){

                console.log(result)
            }
        })


        //  limpando a caixa de texto após cada pressionamento de botão
        $('#text').val("")
    })
        
})