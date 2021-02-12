// server endpoint for http requests
const api_endpoint = "http://localhost:8081/memes/";

// gets latest 100 memes and populate the list
function getMemes(){

    // make a GET request
    $.get(api_endpoint, (memes) => {
        $('#list').empty();

        for(let i=0; i<memes.length; i++){
            $('#list').append(
                "<hr><div class=\"container mb-2\"><div class=\"row\"><div class=\"col\"><h4>" + memes[i].caption + "</h4></div></div><div class=\"row\"><div class=\"col\"><img src=" + memes[i].url + " alt=\"Image Unavailable\"></div></div><div class=\"row\"><div class=\"col\"><h6>Submitted by: " + memes[i].name + "</h6></div></div><div class=\"row\"><div class=\"col-6\"><button id=" + memes[i].id + "_edit style=\"margin-left: auto; margin-right: auto; display: block\" type=\"submit\" class=\"btn btn-outline-info pl-4 pr-4\">Edit</button></div><div class=\"col-6\"><button id=" + memes[i].id + "_delete style=\"margin-left: auto; margin-right: auto; display: block\" type=\"submit\" class=\"btn btn-outline-danger pl-4 pr-4\">Delete</button></div></div></div>"
            );

            // event listener for edit button
            $('#' + memes[i].id + '_edit').click(() => {
                $('#' + memes[i].id + '_edit').replaceWith(
                    "<div class=\"container mt-3 text-dark\"><div class=\"row\"><div class=\"col\"><div class=\"heading-2 text-center mt-3\">Update Caption and/or Image URL</div></div></div><div class=\"row\"><div class=\"col\"><div class=\"form-group\"><label for=" + memes[i].id + "_caption\">Caption</label><input class=\"form-control\" id=" + memes[i].id + "_caption placeholder=\"Enter a Caption\" name=" + memes[i].id + "_caption\"></input></div></div></div><div class=\"row\"><div class=\"col\"><div class=\"form-group\"><label for=" + memes[i].id + "_url\">Meme Image URL</label><input class=\"form-control\" id=" + memes[i].id +"_url placeholder=\"Enter URL of the Image\" name=" + memes[i].id + "_url\"></input></div></div></div><div class=\"row\"><div class=\"col\"><button id=" + memes[i].id +"_update type=\"submit\" class=\"btn btn-outline-success pl-4 pr-4\">Update</button></div></div></div></div>"
                );

                // event listener for update button
                $('#' + memes[i].id + '_update').click(() => {
                    var caption = $('#' + memes[i].id + '_caption').val();
                    var url = $('#' + memes[i].id + '_url').val();

                    // make a PATCH request
                    $.ajax({
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        url : api_endpoint + memes[i].id,
                        type : 'PATCH',
                        data : JSON.stringify({caption: caption, url: url}),
                        success : (res, textStatus, jqXHR) => {
                            getMemes();
                        },
                        error : function(jqXHR, textStatus, errorThrown) {
                            console.log("The following error occured: " + textStatus, errorThrown);
                        },
                    });
                });
            });

            // event listener for delete button
            $('#' + memes[i].id + '_delete').click(() => {

                // make a DELETE request
                $.ajax({
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    url : api_endpoint + memes[i].id,
                    type : 'DELETE',
                    success : (res, textStatus, jqXHR) => {
                        getMemes();
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        console.log("The following error occured: " + textStatus, errorThrown);
                    },
                });
            });
        }
    });
}

// event listener for submit button
$(document).on('click', '#submit', () => {
    var name = $('#name').val();
    var caption = $('#caption').val();
    var url = $('#url').val();
    if(!name || !caption || !url){
        alert("Please fill missing fields");
        return;
    }

    // make a POST request
    $.post(api_endpoint, {name: name, caption: caption, url: url}, (data) => {
        getMemes();
    });
});

getMemes();
