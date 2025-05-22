<nav class="breadcrumbs text-center" aria-label="<?php echo e(trans('common.breadcrumb')); ?>">
    <?php $breadcrumbCount = 0; ?>

    
    <?php if(count($crumbs) > 0 && ($crumbs[0] ?? null) instanceof  \BookStack\Entities\Models\Book): ?>
        <a href="<?php echo e(url('/books')); ?>" class="text-book icon-list-item outline-hover">
            <span><?php echo icon('books'); ?></span>
            <span><?php echo e(trans('entities.books')); ?></span>
        </a>
        <?php $breadcrumbCount++; ?>
    <?php endif; ?>

    
    <?php if(count($crumbs) > 0 && ($crumbs[0] ?? null) instanceof  \BookStack\Entities\Models\Bookshelf): ?>
        <a href="<?php echo e(url('/shelves')); ?>" class="text-bookshelf icon-list-item outline-hover">
            <span><?php echo icon('bookshelf'); ?></span>
            <span><?php echo e(trans('entities.shelves')); ?></span>
        </a>
        <?php $breadcrumbCount++; ?>
    <?php endif; ?>

    <?php $__currentLoopData = $crumbs; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $crumb): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <?php $isEntity = ($crumb instanceof \BookStack\Entities\Models\Entity); ?>

        <?php if(is_null($crumb)): ?>
            <?php continue; ?>
        <?php endif; ?>
        <?php if($breadcrumbCount !== 0 && !$isEntity): ?>
            <div class="separator"><?php echo icon('chevron-right'); ?></div>
        <?php endif; ?>

        <?php if(is_string($crumb)): ?>
            <a href="<?php echo e(url($key)); ?>">
                <?php echo e($crumb); ?>

            </a>
        <?php elseif(is_array($crumb)): ?>
            <a href="<?php echo e(url($key)); ?>" class="icon-list-item outline-hover">
                <span><?php echo icon($crumb['icon']); ?></span>
                <span><?php echo e($crumb['text']); ?></span>
            </a>
        <?php elseif($isEntity && userCan('view', $crumb)): ?>
            <?php if($breadcrumbCount > 0): ?>
                <?php echo $__env->make('entities.breadcrumb-listing', ['entity' => $crumb], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php endif; ?>
            <a href="<?php echo e($crumb->getUrl()); ?>" class="text-<?php echo e($crumb->getType()); ?> icon-list-item outline-hover">
                <span><?php echo icon($crumb->getType()); ?></span>
                <span>
                    <?php echo e($crumb->getShortName()); ?>

                </span>
            </a>
        <?php endif; ?>
        <?php $breadcrumbCount++; ?>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
</nav><?php /**PATH /var/www/bookstack/resources/views/entities/breadcrumbs.blade.php ENDPATH**/ ?>