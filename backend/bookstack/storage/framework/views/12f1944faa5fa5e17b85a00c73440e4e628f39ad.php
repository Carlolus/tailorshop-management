<?php if(count($entities) > 0): ?>
    <div class="entity-list <?php echo e($style ?? ''); ?>">
        <?php $__currentLoopData = $entities; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $entity): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php echo $__env->make('entities.list-item', ['entity' => $entity, 'showPath' => $showPath ?? false, 'showTags' => $showTags ?? false], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
<?php else: ?>
    <p class="text-muted empty-text">
        <?php echo e($emptyText ?? trans('common.no_items')); ?>

    </p>
<?php endif; ?><?php /**PATH /var/www/bookstack/resources/views/entities/list.blade.php ENDPATH**/ ?>