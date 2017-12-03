function addUser() {
    window.location.href = 'addRanking.html';
}

function cancelAdd() {
    window.location.href = '/index.html';
}

function checkId() {
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    if (urlParams.has('id')) {
        $.ajax({
            url: '/ranking/listRanking?id=' + urlParams.get('id'),
            error: function(data) {
                alert('Error Occured' + data);
            },
            success: function(data) {
                setField(data.data);
            }
        });
    }
}

function setField(ranking) {
    document.rankingForm.nome.value = ranking[0].nome;
    document.rankingForm.tempo.value = ranking[0].tempo;
    document.rankingForm.dementadores.value = ranking[0].dementadores;
    document.rankingForm.esqueletos.value = ranking[0].esqueletos;
}

function displayranking(ranking) {
    var table = document.getElementById('tableList');
    for (var i = 0; i < ranking.length; i++) {
        var ranking = ranking[i];
        var row = table.insertRow(i + 1);
        var cellId = row.insertCell(0);
        var cellNome = row.insertCell(1);
        var cellTempo = row.insertCell(2);
        var cellDementadores = row.insertCell(3);
        var cellEsqueletos = row.insertCell(4);
        var cellOption = row.insertCell(5);
        cellId.innerHTML = ranking.id;
        cellNome.innerHTML = ranking.nome;
        cellTempo.innerHTML = ranking.tempo;
        cellDementadores.innerHTML = ranking.dementadores;
        cellEsqueletos.innerHTML = ranking.esqueletos;
        var editOption = '<a class="a-inside edit" href="addRanking.html?id=' + ranking.id + '">Edit</a>';
        var deleteOption = '<a class="a-inside delete" href="#" onclick="deleteranking(' + ranking.id + '); return false;"> Delete</a>';
        cellOption.innerHTML = editOption + '&nbsp;' + deleteOption;
    }
}

function saveranking() {
    var urlParams = new URLSearchParams(window.location.search);
    // se houver um id definido, é alteração de cliente, senão é inclusão
    if (urlParams.has('id')) {
        document.rankingForm.action = '/ranking/edit?id=' + urlParams.get('id');
        document.rankingForm.submit();
    } else {
        document.rankingForm.action = '/ranking/add';
        document.rankingForm.submit();
    }
}

function deleteranking(id) {
    $.post('/ranking/delete?id=' + id);
    location.reload();
}