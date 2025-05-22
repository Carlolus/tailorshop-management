<?php $__env->startSection('body-class', 'tri-layout'); ?>
<?php $__env->startSection('content-components', 'tri-layout'); ?>

<?php $__env->startSection('content'); ?>

    <div class="tri-layout-mobile-tabs print-hidden">
        <div class="grid half no-break no-gap">
            <button type="button"
                    refs="tri-layout@tab"
                    data-tab="info"
                    aria-label="<?php echo e(trans('common.tab_info_label')); ?>"
                    class="tri-layout-mobile-tab px-m py-m text-primary">
                <?php echo e(trans('common.tab_info')); ?>

            </button>
            <button type="button"
                    refs="tri-layout@tab"
                    data-tab="content"
                    aria-label="<?php echo e(trans('common.tab_content_label')); ?>"
                    aria-selected="true"
                    class="tri-layout-mobile-tab px-m py-m text-primary active">
                <?php echo e(trans('common.tab_content')); ?>

            </button>
        </div>
    </div>

    <div refs="tri-layout@container" class="tri-layout-container" <?php echo $__env->yieldContent('container-attrs'); ?> >

        <div class="tri-layout-left print-hidden pt-m" id="sidebar">
            <aside class="tri-layout-left-contents">
                <?php echo $__env->yieldContent('left'); ?>
            </aside>
        </div>

        <div class="<?php echo $__env->yieldContent('body-wrap-classes'); ?> tri-layout-middle">
            <div id="main-content" class="tri-layout-middle-contents">
                <?php echo $__env->yieldContent('body'); ?>
            </div>
        </div>

        <div class="tri-layout-right print-hidden pt-m">
            <aside class="tri-layout-right-contents">
                <?php echo $__env->yieldContent('right'); ?>
            </aside>
        </div>
    </div>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.base', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/layouts/tri.blade.php ENDPATH**/ ?>