<?php $__env->startSection('content'); ?>

    <div class="flex-fill flex">
        <div class="content flex">
            <div id="main-content" class="scroll-body">
                <?php echo $__env->yieldContent('body'); ?>
            </div>
        </div>
    </div>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.base', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/layouts/simple.blade.php ENDPATH**/ ?>