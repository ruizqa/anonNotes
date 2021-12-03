const express = require( 'express' );
const path = require( 'path' );
const {APIRouter} = require( './server/routes/apiRouter' );

require( './server/config/database' );
const app = express();


app.use(express.static(path.join(__dirname, "/public/dist/public")));


app.use( express.urlencoded({extended:true}) );
app.use( express.json() );

app.use( '/api', APIRouter );

app.all( '*', function( request, response ){
    response.sendFile( path.resolve( './public/dist/public/index.html' ) );
});

app.listen( 8181, function(){
    console.log( "The users server is running in port 8181." );
});