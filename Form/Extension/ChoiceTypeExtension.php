<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 07/06/17
 * Time: 14:15
 */

namespace Miky\Bundle\AdminBundle\Form\Extension;


use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ChoiceTypeExtension extends AbstractTypeExtension
{
    public function getExtendedType()
    {
        return ChoiceType::class;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefined(array('simple_select'));
        $resolver->setDefaults(array(
            "simple_select" => true
        ));
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['simple_select'] = $options["simple_select"];
    }

}