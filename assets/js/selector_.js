window.addEventListener('load', function() {
    
    let valorGuardado = localStorage.getItem('geracaoSelecionada')
    select.value = valorGuardado;
    let offsetMaxRecords;
    
    switch (true) {
        case valorGuardado === '0':
            offsetMaxRecords = [0, 1302, 40];
            limit = offsetMaxRecords[2];
            break;
        case valorGuardado === '1':
            offsetMaxRecords = [0, 150];
            break;
        case valorGuardado === '2':
            offsetMaxRecords = [151, 250];
            break;
        case valorGuardado === '3':
            offsetMaxRecords = [251, 385];
            break;
        case valorGuardado === '4':
            offsetMaxRecords = [386, 492];
            break;
        case valorGuardado === '5':
            offsetMaxRecords = [493, 648];
            break;
        case valorGuardado === '6':
            offsetMaxRecords = [649, 720];
            break;
        case valorGuardado === '7':
            offsetMaxRecords = [721, 808];  
            break;
        case valorGuardado === '8':
            offsetMaxRecords = [809, 904];
            break; 
        case valorGuardado === '9':
            offsetMaxRecords = [905, 1025];
            break;
        case valorGuardado === '10':
            offsetMaxRecords = [1057, 1302];
    }

    offset = offsetMaxRecords[0];
    maxRecords = offsetMaxRecords[1];
    loadMoreItens(offset, limit);
})

select.addEventListener('change', function(e) {
let valorSelecionado = e.target.value; 
console.log(valorSelecionado);
localStorage.setItem('geracaoSelecionada', valorSelecionado);
location.reload();

})
