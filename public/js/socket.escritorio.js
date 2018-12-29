//Comando para establecer la conexión
var socket = io()

socket.on('connect', function() {
    console.log('Conectado al servidor')
})

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
})

//Obtenemos el numero de escritorio por el URL ?escritorio=XXXX
var searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio')
var label = $('small')

console.log(escritorio)
$('h1').text('Escritorio ' + escritorio)

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp)
        if (resp === 'Ya no hay tickets') {
            label.text(resp)
            alert(resp) //Despliega el contenido de resp que es que ya no hay mas tickets
            return
        }
        label.text('Ticket ' + resp.numero)
    })
})