
<?php if(count($activity) > 0): ?>
    <div class="activity-list">
        <?php $__currentLoopData = $activity; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $activityItem): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <div class="activity-list-item">
                <?php echo $__env->make('common.activity-item', ['activity' => $activityItem], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
<?php else: ?>
    <p class="text-muted empty-text"><?php echo e(trans('common.no_activity')); ?></p>
<?php endif; ?><?php /**PATH /var/www/bookstack/resources/views/common/activity-list.blade.php ENDPATH**/ ?>