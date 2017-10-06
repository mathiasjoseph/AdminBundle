<?php

namespace Miky\Bundle\AdminBundle\Controller\Admin;

use Miky\Bundle\AdminBundle\Controller\AdminController;
use Symfony\Component\HttpFoundation\Request;

class DashboardController extends AdminController
{
    public function __construct()
    {

    }
    public function indexAction(Request $request)
    {
        return $this->render('MikyAdminBundle:Admin/Dashboard:index.html.twig');
    }
}
