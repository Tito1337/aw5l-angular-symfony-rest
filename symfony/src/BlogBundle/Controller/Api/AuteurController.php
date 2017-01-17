<?php

namespace BlogBundle\Controller\Api;

use BlogBundle\Entity\Auteur;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class AuteurController extends Controller
{
    /**
     * Créer un nouvel auteur
     *
     * @Route("/api/auteur")
     * @Method("POST")
     */
    public function newAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $auteur = new Auteur($data['nom'], $data['prenom'], $data['email']);
        $em = $this->getDoctrine()->getManager();
        $em->persist($auteur);
        $em->flush();


        $data = $this->serializeAuteur($auteur);
        $response = new JsonResponse($data, 201);
        $showURL = $this->generateUrl('api_auteur_id', ['id' => $auteur->getid()]);
        $response->headers->set('Location', $showURL);
        return $response;
    }

    /**
     * Récupérer un auteur par ID
     *
     * @Route("/api/auteur/{id}", requirements={"id"="\d+"}, name="api_auteur_id")
     * @Method("GET")
     */
    public function showAction($id)
    {
        $auteur = $this->getDoctrine()
                  ->getRepository('BlogBundle:Auteur')
                  ->find($id);

        if(!$auteur) {
            throw $this->createNotFoundException(
                sprintf('Il n\'existe pas d\'auteur avec l\'ID "%d"', $id));
        }

        $response = new JsonResponse($this->serializeAuteur($auteur), 200);
        return $response;
    }

    /**
     * Récupérer plusieurs auteurs
     *
     * @Route("/api/auteur")
     * @Method("GET")
     */
    public function listAction()
    {
        $auteurs = $this->getDoctrine()
                  ->getRepository('BlogBundle:Auteur')
                  ->findAll();

        $data = array();
        foreach($auteurs as $auteur) {
            $data[] = $this->serializeAuteur($auteur);
        }

        $response = new JsonResponse($data, 200);
        return $response;
    }

    /**
     * Modifier un auteur
     *
     * @Route("/api/auteur/{id}", requirements={"id"="\d+"})
     * @Method("PUT")
     */
    public function updateAction($id, Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $auteur = $this->getDoctrine()
          ->getRepository('BlogBundle:Auteur')
          ->find($id);

        if(!$auteur) {
            throw $this->createNotFoundException(
                sprintf('Il n\'existe pas d\'auteur avec l\'ID "%d"', $id));
        }

        $auteur->setNom($data['nom']);
        $auteur->setPrenom($data['prenom']);
        $auteur->setEmail($data['email']);

        $em = $this->getDoctrine()->getManager();
        $em->persist($auteur);
        $em->flush();

        $data = $this->serializeAuteur($auteur);
        $response = new JsonResponse($data, 200);
        return $response;
    }

    /**
     * Supprimer un auteur
     *
     * @Route("/api/auteur/{id}", requirements={"id"="\d+"})
     * @Method("DELETE")
     */
    public function deleteAction($id, Request $request)
    {
        $auteur = $this->getDoctrine()
          ->getRepository('BlogBundle:Auteur')
          ->find($id);

        if(!$auteur) {
            throw $this->createNotFoundException(
                sprintf('Il n\'existe pas d\'auteur avec l\'ID "%d"', $id));
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($auteur);
        $em->flush();

        return new Response(null, 204);
    }

    /**
     * Sérializer un Auteur pour transfert JSON
     */
    private function serializeAuteur(Auteur $auteur)
    {
        return array(
            'id' => $auteur->getId(),
            'nom' => $auteur->getNom(),
            'prenom' => $auteur->getPrenom(),
            'email' => $auteur->getEmail(),
        );
    }
}
