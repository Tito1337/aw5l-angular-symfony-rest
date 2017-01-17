<?php

namespace BlogBundle\Controller\Api;

use BlogBundle\Entity\Auteur;
use BlogBundle\Entity\Article;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ArticleController extends Controller
{
    /**
     * Créer un nouvel article
     *
     * @Route("/api/article")
     * @Method("POST")
     */
    public function newAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $auteur = $this->getDoctrine()
                  ->getRepository('BlogBundle:Auteur')
                  ->find($data['auteur']);
        $date = new \DateTime();
        $article = new Article($data['title'], $data['content'], $date, $auteur);

        $em = $this->getDoctrine()->getManager();
        $em->persist($article);
        $em->flush();

        $data = $this->serializeArticle($article);
        $response = new JsonResponse($data, 201);
        $showURL = $this->generateUrl('api_article_id', ['id' => $article->getid()]);
        $response->headers->set('Location', $showURL);
        return $response;
    }

    /**
     * Récupérer un article par ID
     *
     * @Route("/api/article/{id}", requirements={"id"="\d+"}, name="api_article_id")
     * @Method("GET")
     */
    public function showAction($id)
    {
        $article = $this->getDoctrine()
                  ->getRepository('BlogBundle:Article')
                  ->find($id);

        if(!$article) {
            throw $this->createNotFoundException(
                sprintf('Il n\'existe pas d\'article avec l\'ID "%d"', $id));
        }

        $response = new JsonResponse($this->serializeArticle($article), 200);
        return $response;
    }

    /**
     * Récupérer plusieurs articles
     *
     * @Route("/api/article")
     * @Method("GET")
     */
    public function listAction()
    {
        $articles = $this->getDoctrine()
                  ->getRepository('BlogBundle:Article')
                  ->findBy([], ['id' => 'DESC']);

        $data = array();
        foreach($articles as $article) {
            $data[] = $this->serializeArticle($article);
        }

        $response = new JsonResponse($data, 200);
        return $response;
    }

    /**
     * Modifier un article
     *
     * @Route("/api/article/{id}", requirements={"id"="\d+"})
     * @Method("PUT")
     */
    public function updateAction($id, Request $request)
    {
        $data = json_decode($request->getContent(), true);


        $article = $this->getDoctrine()
          ->getRepository('BlogBundle:Article')
          ->find($id);

        if(!$article) {
            throw $this->createNotFoundException(
                sprintf('Il n\'existe pas d\'article avec l\'ID "%d"', $id));
        }

        $article->setTitle($data['title']);
        $article->setContent($data['content']);

        $auteur = $this->getDoctrine()
                  ->getRepository('BlogBundle:Auteur')
                  ->find($data['auteur']['id']);
        $article->setAuteur($auteur);

        $em = $this->getDoctrine()->getManager();
        $em->persist($article);
        $em->flush();

        $data = $this->serializeArticle($article);
        $response = new JsonResponse($data, 200);
        return $response;
    }

    /**
     * Supprimer un article
     *
     * @Route("/api/article/{id}", requirements={"id"="\d+"})
     * @Method("DELETE")
     */
    public function deleteAction($id, Request $request)
    {
        $article = $this->getDoctrine()
          ->getRepository('BlogBundle:Article')
          ->find($id);

        if(!$article) {
            throw $this->createNotFoundException(
                sprintf('Il n\'existe pas d\'article avec l\'ID "%d"', $id));
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($article);
        $em->flush();

        return new Response(null, 204);
    }


    /**
     * Sérializer un Article pour transfert JSON
     */
    private function serializeArticle(Article $article)
    {
        return array(
            'id' => $article->getId(),
            'title' => $article->getTitle(),
            'content' => $article->getContent(),
            'date' => $article->getDate(),
            'auteur' => $this->serializeAuteur($article->getAuteur()),
        );
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
