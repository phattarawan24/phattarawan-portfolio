$(document).ready(function () {
    getToken().then((rs) => {
        if (rs.response != "") {
            getProfile(rs.response.token);
            getExper(rs.response.token);
            getSkill(rs.response.token);
        }
    });
});

function getProfile(token) {
    $.ajax({
        url: `${baseURL}api/v1/profile`,
        type: 'GET',
        headers: { 'Authorization': token },
        contentType: 'application/json; charset=utf-8',
        success: function (rs) {
            if (rs.response.length > 0) {
                let data = rs.response[0];
                console.log(data);
                $("#home").find(".full-name").text(`${data['first_name']} ${data['last_name']}`)
                $("#home").find(".img-fluid").attr('src', `${data['img']}`)
                $('#about').find(".name").text(`Name: ${data['first_name']} ${data['last_name']}`)
                $('#about').find(".birthday").text(`Birthday: ${data['birthday']}`)
                $('#about').find(".degree").text(`Degree: ${data['degree']}`)
                $('#about').find(".experience").text(`Experience: ${data['experience']}`)
                $("#about").find(".img-fluid").attr('src', `${data['img']}`)
                $('#about').find(".phone").text(`Phone: ${data['phone']} `)
                $('#about').find(".email").text(`Email: ${data['email']} `)
            }
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function getExper(token) {
    $.ajax({
        url: `${baseURL}api/v1/way`,
        type: 'GET',
        headers: { 'Authorization': token },
        contentType: 'application/json; charset=utf-8',
        success: function (rs) {
            if (rs.response.length > 0) {
                let data = rs.response;
                // console.log(data);
                let eduhtml_ = '';
                let exphtml_ = '';
                $.each(data, function (key, value) {
                    // console.log(value);
                    if (value.type == 1) {
                        eduhtml_ += `<div class="position-relative mb-4">
                        <i class="far fa-dot-circle text-primary position-absolute"
                            style="top: 2px; left: -32px;"></i>
                        <h5 class="font-weight-bold mb-1">${value.title}</h5>
                        <p class="mb-2"><strong>${value.detail}</strong> | <small>${value.date}</small></p>
                        <p</p>
                    </div> `
                    } else {
                        exphtml_ += `<div class="position-relative mb-4">
                        <i class="far fa-dot-circle text-primary position-absolute"
                            style="top: 2px; left: -32px;"></i>
                        <h5 class="font-weight-bold mb-1">${value.title}</h5>
                        <p class="mb-2"><strong>${value.detail}</strong> | <small>${value.date}</small></p>
                        <p></p>
                    </div> `
                    }
                });
                $(".my-edu").find(".border-primary").html(eduhtml_);
                $(".my-exp").find(".border-primary").html(exphtml_);
            }
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function getSkill(token) {
    $.ajax({
        url: `${baseURL}api/v1/skill`,
        type: 'GET',
        headers: { 'Authorization': token },
        contentType: 'application/json; charset=utf-8',
        success: function (rs) {
            if (rs.response.length > 0) {
                let data = rs.response;
                // console.log(data);
                let fontHtml_ = '';
                let backHtml_ = '';
                $.each(data, function (key, value) {
                    // console.log(value);
                    if (value.type == 1) {
                        console.log(1)
                        backHtml_ += `<div class="skill mb-4 ">
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-bold">${value.title}</h6>
                            <h6 class="font-weight-bold">${value.level}%</h6>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="${value.level}" aria-valuemin="0"
                                aria-valuemax="100"></div>
                        </div>
                    </div>`
                    } else {
                        fontHtml_ += `<div class="skill mb-4 ">
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-bold">${value.title}</h6>
                            <h6 class="font-weight-bold">${value.level}%</h6>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="${value.level}" aria-valuemin="0"
                                aria-valuemax="100"></div>
                        </div>
                    </div>`
                    }

                });
                $(".my-skill-back").html(backHtml_);
                $(".my-skill-font").html(fontHtml_);
                $('.skill').waypoint(function () {
                    $('.progress .progress-bar').each(function () {
                        $(this).css("width", $(this).attr("aria-valuenow") + '%');
                    });
                }, { offset: '80%' })

            }
        },
        error: function (err) {
            console.error(err);
        }
    });
}

getToken = async () => {
    let formData = new FormData();
    formData.append('phone', '0805231153');
    const settings = {
        method: 'POST',
        body: formData
    };
    try {
        const fetchResponse = await fetch(`${baseURL}api/v1/login`, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        return e;
    }

}