<?php
require __DIR__.'/vendor/autoload.php';
$client = new \GuzzleHttp\Client([
    'base_url' => 'http://aw5l/symfony/web/app_dev.php/',
    'defaults' => [
        'exceptions' => false
    ]
]);

$nom = 'Nom'.rand(0, 999);
$prenom = 'Prenom'.rand(0, 999);

$data = array(
    'nom' => $nom,
    'prenom' => $prenom,
    'email' => 'text@example.com'
);
$response = $client->post('api/auteur', [
    'body' => json_encode($data)
]);

echo $response;
echo "\n\n";
?>
