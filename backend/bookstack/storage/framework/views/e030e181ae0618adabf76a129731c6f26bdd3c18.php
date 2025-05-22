<?php $__env->startSection('body-class', 'flexbox'); ?>

<?php $__env->startSection('content'); ?>

    <div id="main-content" class="flex-fill flex fill-height">
        <form action="<?php echo e($page->getUrl()); ?>" autocomplete="off" data-page-id="<?php echo e($page->id); ?>" method="POST" class="flex flex-fill">
            <?php echo e(csrf_field()); ?>


            <?php if(!$isDraft): ?> <?php echo e(method_field('PUT')); ?> <?php endif; ?>
            <?php echo $__env->make('pages.parts.form', ['model' => $page], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php echo $__env->make('pages.parts.editor-toolbox', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </form>
    </div>
    
    <?php echo $__env->make('pages.parts.image-manager', ['uploaded_to' => $page->id], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <?php echo $__env->make('pages.parts.code-editor', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <?php echo $__env->make('entities.selector-popup', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.base', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/pages/edit.blade.php ENDPATH**/ ?>